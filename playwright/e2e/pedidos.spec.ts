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

    // const orderCode = page.locator('//p[text()="Pedido"]/..//p[text()="VLO-QL43NG"]')
    // await expect(orderCode).toBeVisible({ timeout: 10_000 })

    const containerPedido = page.getByRole('paragraph')
        .filter({ hasText: /^Pedido$/ })
        .locator('..')

    await expect(containerPedido).toContainText('VLO-QL43NG', {timeout: 10_000})
    await expect(page.getByText('APROVADO')).toBeVisible();
    await expect(page.locator('//div[text()="APROVADO"]')).toContainText('APROVADO')
});