const Images = [
    "/random/Delivery-boy.png",
    "/random/Delivery-boy-2.png",
    "/random/Delivery-boy-3.png",
    "/random/Delivery-boy-4.png",
    "/random/Delivery-boy-5.png",
    "/random/Teamwork-1.png",
    "/random/Teamwork-2.png",
    "/random/Teamwork-5.png",
    "/random/Teamwork-7.png",
    "/random/Teamwork-8.png",
    "/random/Upstream-1.png",
    "/random/Upstream-4.png",
    "/random/Upstream-6.png",
    "/random/Upstream-7.png",
    "/random/Upstream-8.png",
]

const random = Math.floor(Math.random() * Images.length)
const imagesRandom = Images[random]

export default imagesRandom