import { request } from 'network/request';

export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}
export function getRecommend() {
    return request({
        url: '/recommend',
    })
}
export class Goods {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title;
        this.price = itemInfo.price;
        this.desc = itemInfo.desc;
        this.oldPrice = itemInfo.oldPrice;
        this.discount = itemInfo.discountDesc;
        this.realPrice = itemInfo.lowNowPrice
        this.columns = columns;
        this.services = services;
    }
}