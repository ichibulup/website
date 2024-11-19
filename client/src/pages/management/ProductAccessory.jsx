import { AccessoryForm } from "../../components/modal/form/AccessoryForm"
export const ProductAccessory = () => {
    const obj = {
        tower: '1111',
        street: '2222',
        district: '3333',
        city: '44444',
        state: '555555',
        country: '666666'
    }
    return (
        <>
            <AccessoryForm
                address={obj}
                onHide={() => true}
                show={false}
            />
        </>
    )
}