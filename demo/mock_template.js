// Mock.mock(template)
let Mock = require('mockjs');
let template = {
    'title': 'Syntax Demo',

    'string1|1-10': '★',// string 重复次数1-10次
    'string2|3': 'value',// string 重复次数3

    'number1|+1': 100,// 生成的值自动+1 初始值是100
    'number2|1-100': 100,// 生成1-100之间的整数
    'number3|1-100.1-10': 1,// 生成整数部分为1-100，小数位数为1-10位
    'number4|123.1-10': 1,// 生成整数部分为123 小数位数为1-10的浮点数
    'number5|123.3': 1,// 生成整数部分为123 小数位数为3位的浮点数
    'number6|123.10': 1.123,// 生成整数部分为123 小数位数为10位的浮点数

    'boolean1|1': true,// 生成一个布尔类型 true false 的概率都是0.5
    'boolean2|1-2': true,// 生成一个布尔类型 true的概率是1／（1+2） ！true的概率是 2／（1+2）

    'object1|2-4': {
        '110000': '北京市',
        '120000': '天津市',
        '130000': '河北省',
        '140000': '山西省'
    },// 随机从所有属性中取最少2个 最多4个属性 作为返回值
    'object2|2': {
        '310000': '上海市',
        '320000': '江苏省',
        '330000': '浙江省',
        '340000': '安徽省'
    },// 随机从所有属性中取2个属性，作为返回值 返回

    'array1|1': ['AMD', 'CMD', 'KMD', 'UMD'],// 从数组的备选元素中取一个作为元素返回 返回值是一个元素
    'array2|1-10': ['Mock.js'],// 将元素重复1-10次作为数组的元素返回 返回值是一个数组
    'array3|3': ['Mock.js'],// 将元素重复3次 作为数组元素的返回值返回 返回值是一个数组
    'array1|2': ['AMD', 'CMD', 'KMD', 'UMD'],// 返回值是一个数组  数组的元素是将备选数组的所有元素重复2次 作为数组返回
    'function': function() {
        return this.title
    }
}
let data = Mock.mock(template)

console.log(JSON.stringify(data, null, 4));