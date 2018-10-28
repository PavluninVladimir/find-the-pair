import pic1 from '../pictures/111.jpg'
import pic2 from '../pictures/animals-bunny.jpg'
import pic3 from '../pictures/animals-bunny-2.jpg'
import pic4 from '../pictures/animals-cat.jpg'
import pic5 from '../pictures/animals-cat-2.jpg'
import pic6 from '../pictures/animals-dog.jpg'
import pic7 from '../pictures/animals-dog-2.jpg'
import pic8 from '../pictures/animals-horse.jpg'
import pic9 from '../pictures/animals-horse-2.jpg'
import pic10 from '../pictures/architecture-london-towerbridge.jpg'
import pic11 from '../pictures/architecture-moscow-redsquare.jpg'
import pic12 from '../pictures/architecture-nederlanden.jpg'
import pic13 from '../pictures/architecture-newyork-publiclibrary.jpg'
import pic14 from '../pictures/architecture-paris-eiffeltower.jpg'
import pic15 from '../pictures/cities-tokyo-night.jpg'
import pic16 from '../pictures/flowers-reddahlia.jpg'
import pic17 from '../pictures/flowers-waterlillies.jpg'
import pic18 from '../pictures/flowers-windclock.jpg'
import pic19 from '../pictures/images(11).jpg'
import pic20 from '../pictures/images(12).jpg'
import pic21 from '../pictures/images(13).jpg'
import pic22 from '../pictures/images(15).jpg'
import pic23 from '../pictures/images(18).jpg'
import pic24 from '../pictures/images(19).jpg'
import pic25 from '../pictures/images(21).jpg'
import pic26 from '../pictures/images(22).jpg'
import pic27 from '../pictures/images(23).jpg'
import pic28 from '../pictures/images(25).jpg'
import pic29 from '../pictures/images(26).jpg'
import pic30 from '../pictures/images(27).jpg'
import pic31 from '../pictures/landscape-1.jpg'
import pic32 from '../pictures/landscape-2.jpg'
import pic33 from '../pictures/landscape-australia-outback.jpg'
import pic34 from '../pictures/landscape-netherlands-deurningen.jpg'
import pic35 from '../pictures/landscape-us-edgewood.jpg'

/**
 * Get list img.
 * @param {string} count - count pictures.
 * @returns {array}
 */
export default function getImg(count) {
    if (typeof count !== 'number') {
        return ['count only integer']
    }
    let pictures = [
        pic1,
        pic2,
        pic3,
        pic4,
        pic5,
        pic6,
        pic7,
        pic8,
        pic9,
        pic9,
        pic10,
        pic11,
        pic12,
        pic13,
        pic14,
        pic15,
        pic16,
        pic17,
        pic18,
        pic19,
        pic20,
        pic21,
        pic22,
        pic23,
        pic24,
        pic25,
        pic26,
        pic27,
        pic28,
        pic29,
        pic30,
        pic31,
        pic32,
        pic33,
        pic34,
        pic35
    ]
    if (pictures.length <= count) {
        return ['no so many pictures']
    }
    return pictures.slice(0,count);
}