import { test, expect } from '@playwright/test'

test('deve consultar um pedido aprovado', async ({ page }) => {

    // Arrange
    await page.goto('http://localhost:5173/')
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
    await page.getByRole('link', { name: 'Consultar Pedido' }).click()
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

    // Act
    await page.getByTestId('search-order-id').fill('VLO-QL43NG')
    await page.getByTestId('search-order-button').click()

    // Assert
    await expect(page.getByTestId('order-result-id')).toContainText('VLO-QL43NG')
    await expect(page.getByTestId('order-result-status')).toContainText('APROVADO')
});