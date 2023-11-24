import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {
  test('Quick payment with correct data', async ({ page }) => {
    // Arrange
    const url = 'https://demo-bank.vercel.app/';
    const userId = 'testerLO';
    const userPassword = 'asdfghjk';

    const receiverId = '2';
    const transferAmount = '150';
    const transferTitle = 'pizza';
    const expectedTransferReceiver = 'Chuck Demobankowy';

    // Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_transfer_receiver').selectOption(receiverId);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);

    await page.getByRole('button', { name: 'wykonaj' }).click();
    //await page.getByTestId('close-button').click();

    // Assert
    await expect(page.locator('#show_messages')).toHaveText(
      `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });
  test('Successful mobile top-up', async ({ page }) => {
    //Arrange
    const url = 'https://demo-bank.vercel.app/';
    const userId = 'testerLO';
    const userPassword = 'asdfghjk';
    
    const receiverId = '2';
    const receiverNumber = '500 xxx xxx';
    const transferAmount = '150';

    //Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_topup_receiver').selectOption('500 xxx xxx');
    await page.locator('#widget_1_topup_amount').fill(transferAmount);
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();

    //Assert
    await expect(page.locator('#show_messages')).toHaveText(
      `Doładowanie wykonane! ${transferAmount},00PLN na numer ${receiverNumber}`,
    );
  });
});
