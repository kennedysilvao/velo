import { test, expect } from '@playwright/test'

test('deve consultar um pedido aprovado', async ({ page }) => {

    // Arrange
    await page.goto('/')
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
    await page.getByRole('link', { name: 'Consultar Pedido' }).click()
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

    // Act
    await page.getByTestId('search-order-id').fill('VLO-QL43NG')
    await page.getByTestId('search-order-button').click()

    // Assert
    await expect(page.getByText('VLO-QL43NG')).toBeVisible();
    await expect(page.locator('//p[text()="VLO-QL43NG"]')).toContainText('VLO-QL43NG')
    await expect(page.getByText('APROVADO')).toBeVisible();
    await expect(page.locator('//div[text()="APROVADO"]')).toContainText('APROVADO')
});