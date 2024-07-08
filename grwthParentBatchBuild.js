import {By, Key, Builder, until, Capabilities} from 'selenium-webdriver'
import 'chromedriver'

let ele;
const chromeCapabilities = Capabilities.chrome()
const dir = 'C:\\Users\\username\\path\\to\\folder\\with\\chromedriver'//Fill in Path of Chromedriver
const ac = ''//Fill in Account
const pw = ''//Fill in Password
const data = [//Fill in List
  ['ChiName', 'ParentMobile', 1(Dad)/2(Mum)/3(Other), 1],
]

chromeCapabilities.set('goog:chromeOptions', {
  args: ['disable-infobars'],
  prefs: {
    download: {
      default_directory: dir,
      prompt_for_download: false,
      directory_upgrade: true
    },
    plugins: {
      always_open_pdf_externally: true,
    }
  }
})

const run = async () => {
  const wd = await new Builder().forBrowser('chrome').withCapabilities(chromeCapabilities).build()
  try {
    await wd.get('https://app.grwth.hk/schoolpf/login');
    await wd.findElement(By.xpath(`//*[@id="usertab"]/li[3]/a`)).click();
    await wd.sleep(1000);
    await wd.findElement(By.xpath(`//*[@id="teacher"]/div[1]/div/input`)).sendKeys(ac)
    await wd.findElement(By.xpath(`//*[@id="teacher"]/div[2]/div/input`)).sendKeys(pw)
    await wd.findElement(By.xpath(`//*[@id="login_button"]`)).click();
    await wd.wait(until.elementLocated(By.xpath(`//*[text()="通告回條"]`)))
    
    for (let i = 0; i < data.length; i++) {
        try {
            await wd.get('https://app.grwth.hk/schoolpf/student/edit_parent_student')
            await wd.wait(until.elementLocated(By.xpath(`//*[@id="user_student"]`)))
            await wd.findElement(By.xpath(`//*[@id="user_student"]/div[1]/label`)).click()
            await wd.findElement(By.xpath('//body')).sendKeys(Key.TAB+Key.ARROW_DOWN+Key.ARROW_DOWN+Key.ARROW_DOWN+Key.ARROW_DOWN+Key.ENTER)
            await wd.sleep(500)
            await wd.findElement(By.xpath(`//*[@id="user_student"]/div[2]/label`)).click()
            await wd.findElement(By.xpath('//body')).sendKeys(Key.TAB+Key.ARROW_DOWN+Key.ARROW_DOWN+Key.ARROW_DOWN+Key.ARROW_DOWN+Key.ARROW_DOWN+Key.ENTER)
            await wd.sleep(500)
            await wd.findElement(By.xpath(`//*[@id="user_student"]/div[3]/label`)).click()
            await wd.findElement(By.xpath('//body')).sendKeys(Key.TAB+Key.ENTER)
            await wd.sleep(500)
            // await wd.findElement(By.xpath(`//*[@id="search-table"]`)).sendKeys(data[i][0])
            // await wd.findElement(By.xpath(`//*[@id="search-form"]/button`)).click()
            // await wd.findElement(By.xpath(`//*[@id="s_student"]/tbody/tr[1]/td[12]/div/a/i`)).click()
            // await wd.findElement(By.xpath(`//*[@id="s_student"]/tbody/tr[1]/td[12]/div/ul/li[3]/a`)).click()
            // console.log(1)
            // console.log(2)
            await wd.findElement(By.xpath(`//ul//*[text()="${data[i][0]}"]`)).click()
            // await wd.findElement(By.xpath(`/html/body/div[4]/div[2]/div[1]/div[2]/div/div[1]/div[1]/div/a[2]`)).click()
            await wd.findElement(By.xpath(`//*[@id="name_zh"]`)).sendKeys(data[i][1])
            await wd.findElement(By.xpath(`//*[@id="myphone"]`)).sendKeys(data[i][1])
            await wd.findElement(By.xpath(`//*[@id="pwd"]`)).sendKeys(data[i][1])
            await wd.findElement(By.xpath(`//*[@id="pwd2"]`)).sendKeys(data[i][1])
            if(data[i][2] === 1) {
              await wd.findElement(By.xpath('//body')).sendKeys(Key.TAB+Key.ARROW_DOWN+Key.ARROW_DOWN+Key.ENTER)
            } else if(data[i][2] === 2) {
              await wd.findElement(By.xpath('//body')).sendKeys(Key.TAB+Key.ARROW_DOWN+Key.ARROW_DOWN+Key.ARROW_DOWN+Key.ARROW_DOWN+Key.ARROW_DOWN+Key.ENTER)
            } else {
              await wd.findElement(By.xpath('//body')).sendKeys(Key.TAB+Key.ARROW_DOWN+Key.ARROW_DOWN+Key.ARROW_DOWN+Key.ARROW_DOWN+Key.ARROW_DOWN+Key.ARROW_DOWN+Key.ARROW_DOWN+Key.ARROW_DOWN+Key.ENTER)
            }
            await wd.findElement(By.xpath(`//*[@id="user_student"]/div[13]/div[1]/button`)).click()
            await wd.findElement(By.xpath(`//*[@id="layui-layer1"]/div[3]/a[1]`)).click()
            await wd.sleep(2000)
            await wd.get('https://app.grwth.hk/schoolpf/student/list')
            await wd.wait(until.elementLocated(By.xpath(`//*[text()="用戶頭像"]`)))
            await wd.findElement(By.xpath(`//*[@id="search-table"]`)).sendKeys(data[i][0])
            await wd.findElement(By.xpath(`//*[@id="search-form"]/button`)).click()
            await wd.findElement(By.xpath(`//*[@id="s_student"]/tbody/tr[1]/td[12]/div/a/i`)).click()
            await wd.findElement(By.xpath(`//*[@id="s_student"]/tbody/tr[1]/td[12]/div/ul/li[3]/a`)).click()
            let check = await wd.findElement(By.xpath(`//td[text()='${data[i][1]}']/../td[3]`)).getText()
            if (check === `否`) {
              await wd.findElement(By.xpath(`//td[text()='${data[i][1]}']/../td[7]/div/a`)).click()
              await wd.findElement(By.xpath(`//td[text()='${data[i][1]}']/..//td[7]/div/ul/li[3]/a`)).click()
              await wd.sleep(500)
              await wd.findElement(By.xpath(`//*[@id="ycf-alert"]/div/div/div[3]/button[1]`)).click()
              await wd.sleep(500)
            }
      } catch (e) {
        console.log(`${data[i]}: error`)
      }
    }
  } finally {
    // await driver.quit();
  }
}

run()
