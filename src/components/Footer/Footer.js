import React from 'react';

import Logo from '../Logo/Logo'
import classes from './Footer.module.scss';
import FooterItems from './FooterItems/FooterItems';

const footerList = [
    ['Thông tin', 'Giới thiệu về YaMe.vn', 'Tuyển dụng',  '.', 'Điều khoản mua bán', 'Điều khoản mua bán', '.', 'Mã Voucher giảm giá'],
    [
        ['Đặt hàng và thu tiền tận nơi toàn quốc', '(028) 7307 1441'],
        ['CSKH', 'Than phiền/Chăm sóc khách hàng'],
        ['FAQ', 'Vận chuyển', 'Chính sách đổi trả', 'Chính sách bảo hành', 'Khách hàng VIP', 'Đối tác cung cấp']
    ],
    ['Hệ thống cửa hàng YaMe.vn', 'Tp. HỒ CHÍ MINH', 'TÂY NAM BỘ', 'ĐÔNG NAM BỘ & TÂY NGUYÊN']
]

const Footer = props => {
    const listLi = footerList.map((footer, i) => {
        return i === 0 ? (
            <div key={i}>
                <div className={classes.FooterLogo}>
                    <Logo />
                </div>
                <FooterItems items={footer}/>
            </div>
        ) : i === 1 ? (
            <div key={i}>
                {footer.map((f, ind) => <FooterItems key={ind} items={f} />)}
            </div>
        ) :
        <div key={i}>
            <FooterItems items={footer}/>
        </div>
    });

    return (
        <div className={classes.Footer}>
            <div>
                {listLi}
            </div>
        </div>
    )
}

export default Footer;