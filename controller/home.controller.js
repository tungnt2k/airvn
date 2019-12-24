const axios = require('axios');

const key = 'ec906c5e-cdf8-4437-9575-84f1853980e9';

function aqius(aqi) {
    let aqius;
    if (aqi < 51) {
        aqius = {
            aqi: aqi,
            ico: 'level1.png',
            title: 'Tốt',
            mes: 'Chất lượng không khí là tốt và không gây ra rủi ro cho sức khỏe.'
        }
    }
    else if (aqi < 101) {
        aqius = {
            aqi: aqi,
            ico: 'level2.png',
            title: 'Vừa phải',
            mes: 'Chất lượng không khí có thể chấp nhận được và gây ra ít rủi ro cho sức khỏe. Những người nhạy cảm nên tránh hoạt động ngoài trời vì họ có thể gặp các triệu chứng hô hấp.'
        }
    }
    else if (aqi < 151) {
        aqius = {
            aqi: aqi,
            ico: 'level3.png',
            title: 'Không tốt cho những người nhạy cảm',
            mes: 'Có nguy cơ gặp phải các vấn đề kích thích và hô hấp.'
        }
    }
    else if (aqi < 201) {
        aqius = {
            aqi: aqi,
            ico: 'level4.png',
            title: 'Không tốt',
            mes: 'Làm ảnh hưởng đến tim, phổi, đặc biệt đối với các nhóm người nhạy cảm.'
        }
    }
    else if (aqi < 251) {
        aqius = {
            aqi: aqi,
            ico: 'level5.png',
            title: 'Rất không tốt',
            mes: 'Mọi người sẽ bị ảnh hưởng đáng kể. Những người nhạy cảm nên ở trong nhà và hạn chế các hoạt động.'
        }
    }
    else {
        aqius = {
            aqi: aqi,
            ico: 'level6.png',
            title: 'Độc hại',
            mes: 'Mọi người có nguy cơ cao gặp phải các kích thích mạnh và ảnh hưởng xấu đến sức khỏe, có thể gây ra các bệnh khác. Mọi người nên ở trong nhà.'
        }
    }
    return aqius;
};

module.exports.home = function (req, res) {
    let airVisualApi = 'https://api.airvisual.com/v2/nearest_city?key=' + key;
    axios.get(airVisualApi)
        .then(function (response) {
            let aqi = response.data.data.current.pollution.aqius;
            res.render('index', { data: response.data, aqi: aqius(aqi) });
        })
        .catch(function (error) {
            console.log(error);
        });
}

module.exports.detail = function (req, res) {
    let state = req.query.state;
    let city = req.query.city;
    let airVisualApi = 'https://api.airvisual.com/v2/city?city=' + city + '&state=' + state + '&country=vietnam&key=' + key;
    axios.get(airVisualApi)
        .then(function (response) {
            let aqi = response.data.data.current.pollution.aqius;
            res.render('index', { data: response.data, aqi: aqius(aqi) });
        })
        .catch(function (error) {
            console.log(error);
        });
}