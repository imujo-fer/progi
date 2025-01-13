// Generated by Selenium IDE
import org.junit.Test;
import org.junit.Before;
import org.junit.After;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.core.IsNot.not;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Alert;
import org.openqa.selenium.Keys;
import java.util.*;
import java.net.MalformedURLException;
import java.net.URL;
public class CreatingatriprequesttoafakecityTest {
  private WebDriver driver;
  private Map<String, Object> vars;
  JavascriptExecutor js;
  @Before
  public void setUp() {
    driver = new ChromeDriver();
    js = (JavascriptExecutor) driver;
    vars = new HashMap<String, Object>();
  }
  @After
  public void tearDown() {
    driver.quit();
  }
  @Test
  public void creatingatriprequesttoafakecity() {
    driver.get("https://progi-production.up.railway.app/trip-requests");
    driver.manage().window().setSize(new Dimension(1280, 672));
    driver.findElement(By.cssSelector(".ant-btn > span")).click();
    driver.findElement(By.id("destination")).click();
    driver.findElement(By.id("destination")).sendKeys("Babina Polica");
    driver.findElement(By.cssSelector(".ant-form")).click();
    driver.findElement(By.id("duration")).click();
    {
      WebElement element = driver.findElement(By.cssSelector(".ant-picker-month-btn"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).perform();
    }
    driver.findElement(By.cssSelector(".ant-picker-cell-range-start > .ant-picker-cell-inner")).click();
    driver.findElement(By.cssSelector(".ant-picker-time-panel-column:nth-child(1) > .ant-picker-time-panel-cell:nth-child(2) > .ant-picker-time-panel-cell-inner")).click();
    driver.findElement(By.cssSelector(".ant-picker-time-panel-column:nth-child(2) > .ant-picker-time-panel-cell:nth-child(3) > .ant-picker-time-panel-cell-inner")).click();
    driver.findElement(By.cssSelector(".ant-picker-time-panel-column:nth-child(3) > .ant-picker-time-panel-cell:nth-child(4) > .ant-picker-time-panel-cell-inner")).click();
    driver.findElement(By.cssSelector(".ant-btn-sm > span")).click();
    js.executeScript("window.scrollTo(0,59.33333206176758)");
    driver.findElement(By.cssSelector(".ant-picker-cell-range-end > .ant-picker-cell-inner")).click();
    driver.findElement(By.cssSelector(".ant-picker-time-panel-column:nth-child(1) > .ant-picker-time-panel-cell:nth-child(4) > .ant-picker-time-panel-cell-inner")).click();
    driver.findElement(By.cssSelector(".ant-btn-sm > span")).click();
    driver.findElement(By.cssSelector(".ant-form-item-has-success .ant-form-item-control-input-content")).click();
    driver.findElement(By.cssSelector(".ant-btn:nth-child(2)")).click();
  }
}
