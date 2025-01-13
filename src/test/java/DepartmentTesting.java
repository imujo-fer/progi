package Departments;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class DepartmentTesting {
    @Test
    public void invalidUsername() {
        // Setup chrome driver
        System.setProperty("webdriver.chrome.driver", "C:\\Program Files (x86)\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://progi-production.up.railway.app/trip-requests");

            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(1000));
           
            WebElement createTripButton = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//span[text()='Create trip request']")));

            
            WebElement destinationInput = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("destination")));
            destinationInput.sendKeys("Krapina");

            WebElement reasonInput = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("purpose")));
            reasonInput.sendKeys("Investigating human origins");




        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
