import { test, expect } from '@playwright/test'

test('deve consultar um pedido aprovado', async ({ page }) => {

    // Test Data
    const orderId = 'VLO-QL43NG'
    
    // Arrange

    await page.goto('/')
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
    await page.getByRole('link', { name: 'Consultar Pedido' }).click()
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

    // Act
    await page.getByTestId('search-order-id').fill(orderId)
    await page.getByTestId('search-order-button').click()

    // Assert

    // const orderCode = page.locator('//p[text()="Pedido"]/..//p[text()="VLO-QL43NG"]')
    // await expect(orderCode).toBeVisible({ timeout: 10_000 })

    const containerPedido = page.getByRole('paragraph')
        .filter({ hasText: /^Pedido$/ })
        .locator('..')

    await expect(containerPedido).toContainText(orderId, {timeout: 10_000})
    await expect(page.getByText('APROVADO')).toBeVisible();
    await expect(page.locator('//div[text()="APROVADO"]')).toContainText('APROVADO')
})

test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {
    // Test Data
    const orderId = 'VLO-QL33NG'
    
    // Arrange

    await page.goto('/')
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
    await page.getByRole('link', { name: 'Consultar Pedido' }).click()
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

    // Act
    await page.getByTestId('search-order-id').fill(orderId)
    await page.getByTestId('search-order-button').click()

    // Assert
    const title = page.getByRole('heading', {level: 3, name: 'Pedido não encontrado'})
    await expect(title).toBeVisible()

    const message = page.locator('p', {hasText: 'Verifique o número do pedido e tente novamente'})
    await expect(message).toBeVisible()
})