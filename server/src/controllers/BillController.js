const Bill = require('../models/Bill');
const BillDetail = require('../models/BillDetail')
const Product = require('../models/Product')
const Color = require('../models/Color');
const Configuration = require('../models/Configuration');
// const Accessory = require('../models/Accessory');
const Discount = require('../models/Discount');
const Account = require('../models/Account')
const User = require('../models/User');

class BillController {
    async getAllBill(req, res) {
        try {
            const bills = await Bill.findAll({
                attributes: ['idbill', 'iddiscount', 'date', 'status'], // Chỉ lấy các trường cần thiết từ Bill
                include: [
                    {
                        model: Account,
                        attributes: ['idaccount', 'username', 'email'], // Chỉ lấy các trường cần thiết từ Account
                        include: [
                            {
                                model: User,
                                attributes: ['iduser', 'firstname', 'lastname', 'phone_number'], // Các trường cần từ User
                            }
                        ]
                    }
                ]
            });

            const result = bills.map(bill => ({
                id: bill.idbill,
                date: bill.date,
                price: bill.price,
                status: bill.status,
                account: bill.Account ? {
                    idaccount: bill.Account.idaccount,
                    username: bill.Account.username,
                    email: bill.Account.email,
                    user: bill.Account.User ? {
                        iduser: bill.Account.User.iduser,
                        firstname: bill.Account.User.firstname,
                        lastname: bill.Account.User.lastname,
                        phone_number: bill.Account.User.phone_number
                    } : null
                } : null,
                address: bill.Address ? {
                    idaddress: bill.Address.idaddress,
                    tower: bill.Address.tower,
                    street: bill.Address.street,
                    district: bill.Address.district,
                    city: bill.Address.city,
                    state: bill.Address.state,
                    country: bill.Address.country,
                } : null,
                discount: bill.Discount ? {
                    iddiscount: bill.Discount.iddiscount,
                    discount_name: bill.Discount.discount_name,
                    percentage_discount: bill.Discount.percentage_discount,
                    start_date: bill.Discount.start_date,
                    end_date: bill.Discount.end_date
                } : null,
                bill_details: bill.BillDetails ? bill.BillDetails.map(detail => ({
                    idbill_detail: detail.idbill_details,
                    product: detail.Product ? detail.Product.product_name : null,
                    brand: detail.Product ? detail.Product.brand : null,
                    price: detail.price,
                    configuration: detail.Configuration ? {
                        cpu: detail.Configuration.cpu,
                        ram: detail.Configuration.ram,
                        gpu: detail.Configuration.gpu,
                        storage: detail.Configuration.storage,
                        screen: detail.Configuration.screen,
                        resolution: detail.Configuration.resolution,
                    } : null,
                    color: detail.Color ? detail.Color.color : null,
                    quantity: detail.quantity
                })) : []
            }));

            res.json(result);
        } catch (error) {
            console.error('Error fetching bills:', error);
            res.status(500).json({ error: 'Có lỗi xảy ra khi lấy dữ liệu' });
        }
    };

    async getAllBillByAccount(req, res) {
        try {
            const addresses = await Bill.findAll({ where: { idaccount: req.user.id } });
            res.json(addresses);
        } catch (error) {
            res.status(500).json({ error: 'Có lỗi xảy ra khi lấy dữ liệu' });
        }
    };

    async getBillById(req, res) {
        const { id } = req.params;
        try {
            const address = await Bill.findByPk(id);
            if (address) {
                res.json(address);
            } else {
                res.status(404).json({ error: 'Địa chỉ không tồn tại' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Có lỗi xảy ra khi lấy dữ liệu' });
        }
    };

    async createBill(req, res) {
        const idaccount = req.user.id;
        const { date, iddiscount, idaddress, price, status, items } = req.body;
        console.log(req.body );
        try {
            const newBill = await Bill.create({
                idaccount: req.user.id,
                date: date,
                iddiscount:iddiscount,
                idaddress:idaddress,
                price:price,
                status:status
            });
            for (const e of items) {
                await  BillDetail.create({
                    idbill: newBill.idbill,
                    idproduct: e.idproduct,
                    idcolor:e.idcolor,
                    idconfiguration:e.idconfiguration,
                    quantity:e.quantity,
                    price:1000
                });
            }
            res.status(201).json(newBill);
        } catch (error) {
            res.status(500).json({ error: 'Có lỗi xảy ra khi thêm bill' });
        }
    };

    async createBillDetail(req, res) {
        const { idbill, idproduct, idcolor, idconfiguration, quantity, price } = req.body;
        console.log( req.body);
        try {
            const newBillDetail = await BillDetail.create({
                idbill: idbill,
                idproduct: idproduct,
                idcolor:idcolor,
                idconfiguration:idconfiguration,
                quantity:quantity,
                price:price
            });
            res.status(201).json(newBillDetail);
        } catch (error) {
            res.status(500).json({ error: 'Có lỗi xảy ra khi thêm billDetail' });
        }
    };


    async updateBill(req, res) {
        try {
            const address = await Bill.findByPk(req.params.idaddress);
            if (address) {
                await address.update(req.body);
                res.json(address);
            } else {
                res.status(404).json({ error: 'Địa chỉ không tồn tại' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Có lỗi xảy ra khi cập nhật địa chỉ' });
        }
    };

    async deleteBill(req, res) {
        try {
            const address = await Bill.findByPk(req.params.idaddress);

            if (!address) {
                return res.status(404).json({ error: "Address not found" });
            }

            await address.destroy();
            res.status(200).json({ message: "Address deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to delete address" });
        }
    }
}

module.exports = new BillController();