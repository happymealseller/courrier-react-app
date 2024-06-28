import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { OrderStatusPage, hiddenUIStatuses, removeUIStatuses } from '../pages/OrderStatusPage';
import { sampleStatuses } from './resources/sampleStatuses';
import { statusProperty } from '../utilities/interfaces/statusProperty';
import { OrderStatusType } from '../utilities/enums/OrderStatusType';

const orderDetails = {
    state: {
        orderId: '123456',
        deliveryDate: '2024-06-01T12:00:00Z',
        orderDate: '2024-05-31T10:00:00Z',
        fromAddress: {
            id: 'from-1',
            address: '123 Main St',
            city: 'New York',
            country: 'USA',
            postalCode: '10001'
        },
        fromFullName: 'John Doe',
        fromEmail: 'john.doe@example.com',
        fromPhoneNo: '+1 (555) 123-4567',
        toAddress: {
            id: 'to-1',
            address: '456 Elm St',
            city: 'Los Angeles',
            country: 'USA',
            postalCode: '90001'
        },
        toFullName: 'Jane Smith',
        toEmail: 'jane.smith@example.com',
        toPhoneNo: '+1 (555) 987-6543',
        width: 20,
        length: 30,
        height: 10,
        weight: 5,
        parcelDescription: 'Some description',
        orderStatus: sampleStatuses
    }
};

vi.mock('react-router-dom', () => ({
    useLocation: vi.fn(() => (orderDetails))
}));

describe('OrderStatusPage Component', () => {
    const filteredStatuses = removeUIStatuses(sampleStatuses, hiddenUIStatuses);
    it.each<statusProperty['status']>(filteredStatuses.map(status => status.status))(
        'renders %s status icon and details',
        async (status) => {
            render(<OrderStatusPage />);

            // const statusIcon = screen.getByTestId(`status-icon-${status}`);
            // expect(statusIcon).toBeVisible();

            const orderStatus = OrderStatusType.valueOf(status);
            if (status !== OrderStatusType.Other) {
                const statusDescription = OrderStatusType.statusDescriptionRecord[orderStatus];
                expect(statusDescription).toBeTypeOf("string");
            
                const statusDetails = screen.getByText(new RegExp(statusDescription, "i"));
                expect(statusDetails).toBeVisible();
            }

            const orderDetailsText = screen.getByText(`Track the delivery of order #${orderDetails.state.orderId}`);
            expect(orderDetailsText).toBeVisible();
        }
    );
});
