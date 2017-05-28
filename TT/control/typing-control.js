// 학생 정보를 다루는 서비스를 정의한다.
const express = require('express')


const router = express.Router()

router.get('/a.json', (request, response) => {

  response.json({
    "words": [
              "가드올려",
              "고담",
              "개인전",
              "겐트위한",
              "관심병",
              "귀요미",
              "귀차니즘",
              "글설리",
              "급식충",
              "낄끼빠빠",
              "느금마",
              "늅늅",
              "닝겐",
              "링딩돋다",
              "빼박캔트",
              "빵셔틀",
              "빵국",
              "벅세권",
              "신컨",
              "수치플",
              "샷충",
              "앙기모찌",
              "오니전",
              "용자",
              "웃프다",
              "연덕",
              "음마",
              "저런하다",
              "천조국",
              "츤데레",
              "킬딸",
              "훼이크",
              "흑역사",
              "네덕",
              "고나리",
              "갑툭튀",
              "근자감",
              "내로남불",
              "반반무마니",
              "스압",
              "충공깽",
              "코렁탕",
              "트인낭",
              "현시창",
              "흠좀무",
              "어그로"
            ]
  }
)//{'list': results, 'totalCount': totalCount})

  }, function(error) {
    response.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end('error')
    console.log(error)
  })


module.exports = router
