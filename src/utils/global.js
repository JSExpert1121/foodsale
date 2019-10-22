

const arMap = new Map()
const enMap = new Map()

const erMap = new Map()


function T(key, hash) {
    if (hash.has(key)) return hash.get(key)
    return key
}

function translate1(lang) {
    switch (lang) {
        case 'ar':
            return (key) => T(key, arMap);
        default:
            return (key) => T(key, enMap);
    }
}

function translate2(lang) {
    switch (lang) {
        case 'ar':
            return (key) => T(key, erMap);
        default:
            return (key) => key
    }
}


class global {
    constructor() {
        this.currentUser = null;
        this.countryCode = 'en'
        this.language = 'en'
        this.authToken = null
        this.basicAuthToken = null
        this.environment = {}
        this.searchToken = []
        this.currentCart = null
        this.currency = 'SAR'
        this.currentHotel = null
        this.dateFormat = 'DD/MM/YYYY'
        this.documentTypes = []

        this.Translate={
            T1: translate1(this.language),
            T2: translate2(this.language)
        }
    }

    setLanguage(lang){
        this.language = lang
        this.Translate={
            T1: translate1(lang),
            T2: translate2(lang)
        }
    }

    getPaymentGatewayName(code) {
        var option = this.environment.paymentGatewayInputInfo.find(o => o.code.toLowerCase() == code) || {}
        return option.name || 'Unknown'
    }
}

export default new global();
