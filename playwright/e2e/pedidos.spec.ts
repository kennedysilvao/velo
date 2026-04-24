import { test, expect } from '@playwright/test'
import { generateOrderId } from '../support/helpers'



test.describe('Consulta de Pedido', () => {
    test.beforeEach(async ({ page }) => {
        // Arrange

        await page.goto('/')
        await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
        await page.getByRole('link', { name: 'Consultar Pedido' }).click()
        await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
    })

    test('deve consultar um pedido aprovado', async ({ page }) => {

        // Test Data
        const orderId = 'VLO-QL43NG'

        // Act
        await page.getByTestId('search-order-id').fill(orderId)
        await page.getByTestId('search-order-button').click()

        // Assert
        await expect(page.getByTestId(`order-result-${orderId}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${orderId}
            - img
            - text: APROVADO
            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: Glacier Blue
            - paragraph: Interior
            - paragraph: cream
            - paragraph: Rodas
            - paragraph: aero Wheels
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: Kennedy Silva
            - paragraph: Email
            - paragraph: kennedy@velo.dev
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: /\\d+\\/\\d+\\/\\d+/
            - heading "Pagamento" [level=4]
            - paragraph: À Vista
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
            `);
    })

    test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {
        // Test Data
        const orderId = generateOrderId()

        // Act
        await page.getByTestId('search-order-id').fill(orderId)
        await page.getByTestId('search-order-button').click()

        // Assert
        const title = page.getByRole('heading', { level: 3, name: 'Pedido não encontrado' })
        await expect(title).toBeVisible()

        const message = page.locator('p', { hasText: 'Verifique o número do pedido e tente novamente' })
        await expect(message).toBeVisible()
    })
})


