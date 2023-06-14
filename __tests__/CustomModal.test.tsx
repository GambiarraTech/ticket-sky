import CustomModal from '@/components/CustomModal';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';


describe('CustomModal component', () => {
    it('renders correctly when isOpen is true', () => {
        render(
            <CustomModal isOpen={true} onClose={jest.fn()} haveClose={true} haveWarning={true} haveAvatar={true} title="Test Modal">
                <div>Modal Content</div>
            </CustomModal>
        );

        // Assert that the title is rendered
        const titleElement = screen.getByText(/Test Modal/i);
        expect(titleElement).toBeInTheDocument();

        // Assert that the modal content is rendered
        const contentElement = screen.getByText(/Modal Content/i);
        expect(contentElement).toBeInTheDocument();


    });
});
