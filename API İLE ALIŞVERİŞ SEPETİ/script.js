const kullanıcıSepeti = []  //sepete ekle butonuna basıldığında verilerin geldiği yer
console.log(kullanıcıSepeti)
let jsonFormat = null
const veriler = async function () {

    const request = await fetch('https://fakestoreapi.com/products')
    jsonFormat = await request.json()
    console.log(jsonFormat)

    //jsonformat olarak gelen verilerin üzerinden dö ve ekrana yazdır.
    jsonFormat.forEach(function (data) {
        const containar = document.querySelector(".shopping-containar")

        const divbox = document.createElement("div")
        divbox.classList.add("shopping-box")
        const imgeDiv = document.createElement("div")
        imgeDiv.classList.add("imge")
        const imge = document.createElement("img")
        imge.src = data.image
        imgeDiv.appendChild(imge)
        const divName = document.createElement("div")   //bu kısım create element kullanımı denemek için bu şekilde yazıldı
        divName.classList.add("name")
        divName.innerText = data.title


        const price = document.createElement("div")
        price.classList.add("price")
        price.innerText = `Price:$${data.price}`


        const buton = document.createElement("button")
        buton.innerText = "sepete ekle"
        buton.classList.add("sepete-ekle")
        buton.onclick = function () {
            //butona tıklandığında id leri alıyoruz ve sonra oluşturduğumuz kullanıcıSpetine gönderiyoruz
            // alert(data.id)
            
           //sepete eklenen eleman var ise tekrar eklememesi için find ile bir arama yaptık eğer sepette eleman yok 
           //ise kullanıcının sepete attığı elemanı ekledik ama eğer var ise tekrar eklemsini engellemek için bir
           //sayaç oluşturduk bunun sayesinde sadece eleman sayısını artıra bildik
            const sepetteMi = kullanıcıSepeti.find(function (veri) {

                return veri.id===data.id;

            })
            if (!sepetteMi) {
                kullanıcıSepeti.push(data)
                data.count = 1
            } else {
                data.count += 1
            }
             //sepeti güncellemek için sepet yükleyi tekrar çağırdık(tekrar çalıştırmak için)
            sepetYukle()

        }

        divbox.appendChild(imgeDiv)
        divbox.appendChild(divName)
        divbox.appendChild(price)
        divbox.appendChild(buton)

        containar.appendChild(divbox)




    });
}
veriler()

const sepetİkon = document.querySelector("#sepet")
const sepetContainar = document.querySelector(".sepet-containar")

function openToggle() {
    // alert("tıklandı")
    sepetContainar.classList.toggle('open')

}




function sepetYukle() {

    const sepetİtem=document.querySelector(".sepet-item")
        
    sepetİtem.innerHTML = ""
    kullanıcıSepeti.forEach(function (urun) {    //kullanıcı sepetine gelen veriler üzerinde dön ve containara yazdır
        const div = document.createElement("div")
        div.classList.add("box-div")
        div.innerHTML = `<img src="${urun.image}" alt="${urun.title}">
        <div class="containar-name">${urun.title}</div>
        <button class="azalt">-</button>
        <input  class="deger" type="text" value="1">          
        <button onclick="arttır(${this})" class="arttır">+</button>
        <div class="price">$${urun.price}</div>`

        sepetİtem.appendChild(div)
    })

 //------------------  input içindeki sayı artırılacak-------------------------
    

}


sepetYukle()


