export interface CommonInfo {
    id: number;
    name: string;
}

export interface ProfileInfo {
    id: number;
    nick_name: string;
    avatar: string;
    gender: string;
    birthday: string;
}

export interface UserInfo extends CommonInfo {
    account: string;
    role_names: Array<string>;
    roles: Array<string>;
    created_at: string;
    balances: number;
    points: number;
    profile: ProfileInfo;
}

export interface LocationInfo {
    lat: number;
    lng: number;
}

export type TokenInfo = {
    access_token: string;
    token_type: string;
    expires_in: number;
    roles: string[];
}

type ItemInfo = {
    name: string;
    code: string;
}

export interface NetworkInfo extends CommonInfo {
    state: ItemInfo;
    city: ItemInfo;
    area: ItemInfo;
    address: string;
    lng: number;
    lat: number;
    default?: boolean;
}

export interface CouponInfo extends CommonInfo {
    face_value: number;
    limit_price: number;
    start_date: string;
    end_date: string;
    global: boolean;
    only_first_order: boolean;
    will_expired: boolean;
}

export interface TimeSpan extends CommonInfo {
    start_sale_time: string;
    end_sale_time: string;
}

export interface FullOffInfo extends CommonInfo {
    full_amount: number;
    off_amount: number;
    start_date: string;
    end_date: string;
    global: boolean;
    only_first_order: boolean;
}

export interface DiscountInfo extends CommonInfo {
    discount: number;
    start_date: string;
    end_date: string;
    global: boolean;
    only_first_order: boolean;
}

interface ImageInfo {
    url: string;
    thumb_url: string;
}

export interface MenuInfo extends CommonInfo {
    sale_date: string;
    sale_time: TimeSpan;
    start_sale_time: string;
    end_sale_time: string;
    full_offs: FullOffInfo[];
    coupons: CouponInfo[];
}
interface FoodComment {
    id: number;
    comment_user: string;
    comment_date: string;
    comment: string;
    score: number;
    images: ImageInfo[];
}

interface FoodSummary extends CommonInfo {
    category_id: number;
    ingredient: string;
    side_dish: string;
    weight: number;
    spicy: number;
    images: ImageInfo[];
    suit_crowds: string;
    description: string;
    comments: FoodComment[];
}

export type FoodInfo = {
    id: number;
    menu: MenuInfo;
    food: FoodSummary;
    cost_price: number;
    sale_price: number;
    allow_coupon: boolean;
    allow_full_off: boolean;
    is_special: boolean;
    is_recommend: boolean;
    allow_sale: boolean;
    discounts: DiscountInfo[];
}

export interface CityInfo {
    code: string;
    name: string;
    is_hot: boolean;
    lat: number;
    lng: number;
}

export interface OrderItem {
    id: number;
    order_id: number;
    menu_item_id: number;
    food_id: number;
    order_code_id: number;
    food_name: string;
    cost_price: number;
    sale_price: number;
    quantity: number;
    total_amount: number;
    off_amount: number;
    final_amount: number;
    food: FoodSummary;
    discounts: DiscountInfo[];
    comments: FoodComment[];
}

export interface OrderInfo {
    id: number;
    total_amount: number;
    coupon_amount: number;
    full_off_amount: number;
    off_amount: number;
    final_amount: number;
    status: string;
    created_at: string;
    expired_pay_time: string;
    order_no: string;
    items: OrderItem[];
    full_offs: FullOffInfo[];
    coupons: CouponInfo[];
}

export interface AlipayInfo {
    app_id: string;
    notify_url: string;
    ali_public_key: string;
}

export interface WechatInfo {
    appid: string;
    mch_id: string;
    notify_url: string;
    key: string;
}

export interface GatewayInfo {
    alipay: AlipayInfo;
    wechat: WechatInfo;
    balance: {
        balance: number;
    }
}

export interface GiftInfo extends CommonInfo {
    color: string;
    amount: number;
    gift_amount: number;
    gift_points: number;
    order_no: string;
}