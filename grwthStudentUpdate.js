import {By, Key, Builder, until, Capabilities} from 'selenium-webdriver'
import 'chromedriver'
import env from 'dotenv'
env.config()
const chromeCapabilities = Capabilities.chrome()
const dir = 'C:\\Users\\shepherdng\\Downloads\\Code\\crawler'
chromeCapabilities.set('goog:chromeOptions', {
  args: ['disable-infobars'],
  prefs: {
    download: {
      default_directory: dir,
      prompt_for_download: 'false'
    }
  }
})

const data = [
  // ["hkscJS001","2425133"],
]

const run = async () => {
  const username = process.env.ACCOUNT
  const password = process.env.PASSWORD
  const wd = await new Builder().forBrowser('chrome').withCapabilities(chromeCapabilities).build()
  await wd.get('https://app.grwth.hk/schoolpf/login')
  await wd.findElement(By.xpath('//*[@id="usertab"]/li[3]')).click()
  await wd.findElement(By.xpath('//*[@id="teacher"]/div[1]/div/input'))
    .sendKeys(username, Key.TAB, password, Key.ENTER)
  await wd.wait(until.elementLocated(By.css('div.thumb-wrap')), 5000)
  for (let i = 0; i < data.length; i++) {
    const [oldAC, newAC] = data[i]
    let ele
    try {
      await wd.get('https://app.grwth.hk/schoolpf/student/list')
      await wd.wait(until.elementLocated(By.xpath('//input[@id="search-table"]')), 5000).sendKeys(oldAC, Key.ENTER)
      await wd.wait(until.elementLocated(By.xpath('//*[@id="s_student"]/tbody/tr/td[12]/div/a')), 5000).click()
      await wd.wait(until.elementLocated(By.xpath('//*[@id="s_student"]/tbody/tr/td[12]/div/ul/li[1]/a')), 5000).click()
      ele = await wd.wait(until.elementLocated(By.xpath('//*[@id="account"]')), 5000)
      wd.executeScript(`arguments[0].value='${newAC}'`, ele)
      ele = await wd.wait(until.elementLocated(By.xpath('//*[@id="samsid"]')), 5000)
      wd.executeScript(`arguments[0].value='${"hksc"+newAC}'`, ele)
      wd.executeScript(`document.getElementById('user_student').removeChild(document.getElementById('finish_year_div'))`)
      // await wd.wait(until.elementLocated(By.xpath('//*[@id="user_student"]/div[25]/div[1]/button')), 5000).click()
      await wd.wait(until.elementLocated(By.xpath('//*[@id="name_zh"]')), 5000).sendKeys(Key.ENTER)
      await wd.manage().setTimeouts({ implicit: 800 })
      await wd.wait(until.elementLocated(By.xpath('//*[@id="layui-layer1"]/div[3]/a[1]')), 5000).click()
      await wd.manage().setTimeouts({ implicit: 800 })
      console.log('Done: ', newAC)
    } catch (e) {
      console.log('Fail: ', oldAC, newAC)
    }
  }

  // setTimeout(async () => {
  //   await wd.quit()
  // }, 5000)
}

run()
