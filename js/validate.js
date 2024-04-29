(function () {
    function checkEmpty(selector) {
        var isEmpty = false
        selector.forEach(slt => {
            const element = $(slt).val();
            if (element == "") {
                isEmpty = true
            }
        });
        return isEmpty
    }

    function checkPhone(phoneNumber) {
        return /^\d{10}$/.test(phoneNumber) && phoneNumber[0] === '0';
    }

    function checkName(name) {
        for (i = 0; i < name.length; i++) {
            var ascii = name.charCodeAt(i)
            if (ascii > 32 && ascii < 65 ||
                ascii > 89 && ascii < 97 ||
                ascii > 121 && ascii < 192) {
                return false
            }
        }
        name = name.trim()
        var result = ""
        result += name[0].toUpperCase()
        for (i = 1; i < name.length; i++) {
            if (name[i] == " ") {
                i++;
                result += " " + name[i].toUpperCase()
            }
            else {
                result += name[i].toLowerCase()
            }
        }
        return result
    }

    function checkAge(birthday) {
        var year = parseInt(birthday.substring(0, 4))
        // var month = parseInt(birthday.substring(5, 7))
        // var day = parseInt(birthday.substring(8, 10))
        now = new Date()
        var yearNow = now.getFullYear()
        // var monthNow = now.getMonth() + 1
        // var dayNow = now.getDate()
        if (yearNow - year < 18 || year < 1950)
            return false
        return true
    }

    function checkPrice(price) {
        var check = true;
        for (i = 0; i < price.length; i++) {
            if (isNaN(price[i])) {
                check = false
                break
            }
        }
        return check;
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { checkEmpty, checkPhone, checkName, checkAge, checkPrice };
    }
    else {
        window.checkEmpty = checkEmpty;
        window.checkPhone = checkPhone;
        window.checkAge = checkAge;
        window.checkName = checkName;
        window.checkPrice = checkPrice;
    }
})();
