import babymoon from './../../assets/images/baby-moon.png'
import './styles.css'
const FirstUse = () => {
    return (<>
        <div className="first-use">
            <div className="container">
                <div className='left-side'>
                    <img src={babymoon} alt='baby' />
                </div>
                <div className='right-side'>
                    <p>Welcome to parent’s world!! <br></br>let’s create a profile for your baby</p>
                    <button className='addbaby' >Add my baby</button>
                </div>
            </div>
        </div>
    </>)
}
export default FirstUse;