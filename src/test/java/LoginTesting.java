package Login;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import static org.junit.jupiter.api.Assertions.*;

public class LoginTesting {
    static WebDriver driver;
    static WebDriverWait wait;

    @Test
    public void redirecting() {
        // Setup chrome driver
        System.setProperty("webdriver.chrome.driver", "C:\\Program Files (x86)\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();

        try {

            driver.get("https://progi-production.up.railway.app/login");

            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

            WebElement googleLoginLink = wait.until(ExpectedConditions.elementToBeClickable(
                    By.xpath("//a[contains(@href, '/oauth2/authorization/google')]")
            ));

            googleLoginLink.click();

            wait.until(ExpectedConditions.urlContains("accounts.google.com"));

            String currentUrl = driver.getCurrentUrl();

            assertTrue(currentUrl.contains("accounts.google.com"));
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
        @Test
        public void invalidUsername() {
            // Setup chrome driver
            System.setProperty("webdriver.chrome.driver", "C:\\Program Files (x86)\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe");
            WebDriver driver = new ChromeDriver();

            try {
                // Otvori stranicu za prijavu
                driver.get("https://progi-production.up.railway.app/login");

                WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

                WebElement googleLoginLink = wait.until(ExpectedConditions.elementToBeClickable(
                        By.xpath("//a[contains(@href, '/oauth2/authorization/google')]")
                ));

                googleLoginLink.click();
                WebElement usernameField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("identifierId"))); // ID elementa za unos korisničkog imena na Google stranici


                usernameField.sendKeys("wrongUsername");
                WebElement nextButton = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//span[@jsname='V67aGc' and text()='Next']")));

                nextButton.click();


                WebElement errorMessage = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("error-message"))); // Pretpostavljamo da postoji element s ID-om "error-message" koji prikazuje greške

                assertTrue(errorMessage.isDisplayed(), "Error message not displayed");
                assertTrue(errorMessage.getText().contains("Invalid credentials"), "Error message does not contain expected text");

            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                driver.quit();
            }
        }

}
