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
        const order = {
            number: 'VLO-QL43NG',
            color: 'Glacier Blue',
            wheels: 'aero Wheels',
            customer: {
                name: 'Kennedy Silva',
                email: 'kennedy@velo.dev'
            },
            payment: 'À Vista',
            status: 'APROVADO'
        }

        // Act
        await page.getByTestId('search-order-id').fill(order.number)
        await page.getByTestId('search-order-button').click()

        // Assert
        await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${order.number}
            - status:
                - img
                - text: ${order.status}
            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: ${order.color}
            - paragraph: Interior
            - paragraph: cream
            - paragraph: Rodas
            - paragraph: ${order.wheels}
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: ${order.customer.name}
            - paragraph: Email
            - paragraph: ${order.customer.email}
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: /\\d+\\/\\d+\\/\\d+/
            - heading "Pagamento" [level=4]
            - paragraph: ${order.payment}
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
            `);

            const statusBadge = page.getByRole('status').filter({hasText: order.status})

            await expect(statusBadge).toHaveClass(/bg-green-100/)
            await expect(statusBadge).toHaveClass(/text-green-700/)

            const statusIcon = statusBadge.locator('svg')

            await expect(statusIcon).toHaveClass(/lucide-circle-check-big/)
    })

    test('deve consultar um pedido reprovado', async ({ page }) => {

        // Test Data
        const order = {
            number: 'VLO-KKYWLZ',
            color: 'Midnight Black',
            wheels: 'sport Wheels',
            customer: {
                name: 'Kevin Oliveira',
                email: 'kevin@velo.dev'
            },
            payment: 'À Vista',
            status: 'REPROVADO'
        }

        // Act
        await page.getByTestId('search-order-id').fill(order.number)
        await page.getByTestId('search-order-button').click()

        // Assert
        await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${order.number}
            - status:
                - img
                - text: ${order.status}
            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: ${order.color}
            - paragraph: Interior
            - paragraph: cream
            - paragraph: Rodas
            - paragraph: ${order.wheels}
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: ${order.customer.name}
            - paragraph: Email
            - paragraph: ${order.customer.email}
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: /\\d+\\/\\d+\\/\\d+/
            - heading "Pagamento" [level=4]
            - paragraph: ${order.payment}
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
            `);

            const statusBadge = page.getByRole('status').filter({hasText: order.status})

            await expect(statusBadge).toHaveClass(/bg-red-100/)
            await expect(statusBadge).toHaveClass(/text-red-700/)

            const statusIcon = statusBadge.locator('svg')

            await expect(statusIcon).toHaveClass(/lucide-circle-x/)
    })

    test('deve consultar um pedido em analise', async ({ page }) => {

        // Test Data
        const order = {
            number: 'VLO-54ANR1',
            color: 'Lunar White',
            wheels: 'aero Wheels',
            customer: {
                name: 'João Heleno',
                email: 'heleno@velo.dev'
            },
            payment: 'À Vista',
            status: 'EM_ANALISE'
        }

        // Act
        await page.getByTestId('search-order-id').fill(order.number)
        await page.getByTestId('search-order-button').click()

        // Assert
        await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${order.number}
            - status:
                - img
                - text: ${order.status}
            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: ${order.color}
            - paragraph: Interior
            - paragraph: cream
            - paragraph: Rodas
            - paragraph: ${order.wheels}
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: ${order.customer.name}
            - paragraph: Email
            - paragraph: ${order.customer.email}
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: /\\d+\\/\\d+\\/\\d+/
            - heading "Pagamento" [level=4]
            - paragraph: ${order.payment}
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
            `);

            const statusBadge = page.getByRole('status').filter({hasText: order.status})

            await expect(statusBadge).toHaveClass(/bg-amber-100/)
            await expect(statusBadge).toHaveClass(/text-amber-700/)

            const statusIcon = statusBadge.locator('svg')

            await expect(statusIcon).toHaveClass(/lucide-clock/)
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


