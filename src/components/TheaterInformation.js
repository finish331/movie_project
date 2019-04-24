import React from 'react'
import theaterbanner from '../images/theaterbanner.jpg'
import movie_theater from '../images/movie_Theater.JPG'
import phone from '../images/phone.jpg'
import car from '../images/car.png'
import placeholder from '../images/placeholder.jpg'
import theaterseat from '../images/theaterseat.jpg'
import ad1 from '../images/廣告5.png'
class Theaterinformation extends React.Component {
    state = {
        id: this.props.match.params.id,
        Theaterinformation: []
    }
    componentDidMount() {
        fetch('https://databaseproject-222606.appspot.com/theater', { method: 'GET' })
            .then(res => res.json())
            .then(js => this.setState({ Theaterinformation: js }))
    }
    render() {
        return (
            <div>
                <div style={{
                    backgroundImage: `url(${theaterbanner})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    height: '480px',
                    width: '100vw'
                }} />
                {this.state.Theaterinformation.filter(theater => theater.id == this.state.id)
                    .map(theater =>
                        <div>
                            <div style={{ fontSize: '45px', fontWeight: 'bold', margin: '10px', paddingLeft: '50px', fontFamily: '微軟正黑體', position: 'relative', marginLeft: '50px' }}>影 城 介 紹</div>

                            <div style={{ justifyContent: 'center', paddingRight: '150px', marginRight: '40px', marginLeft: '50px',height:'100%' }}>
                                <div style={{ lineHeight: '50px', fontSize: '18px', paddingLeft: '100px', fontFamily: '微軟正黑體', fontWeight: 'bold ' }}>
                                {theater.introduction}
                                </div>
                            </div>

                            <div style={{ border: 'solid', borderColor: '#999999', borderBottom: '1px', width: '83%', margin: '30px 150px' }}></div>
                            <div style={{ fontSize: '45px', fontWeight: 'bold', margin: '10px', paddingLeft: '50px', fontFamily: '微軟正黑體', position: 'relative', marginLeft: '50px' }}>影 城 資 訊</div>
                            <div style={{ lineHeight: '30px',marginBottom: '80px', display: 'flex', marginLeft: '50px',width:'89%' }}>
                                
                                    <div style={{ width:'100%'}}>
                                        <div style={{ display: 'flex', margin: '15px', paddingLeft: '90px' }}>
                                            <img src={phone} style={{ height: '25px', width: '25px', marginRight: '5px' }} />
                                            <p style={{ margin: '0px', fontFamily: '微軟正黑體', fontWeight: 'bold' }}>服務專線：</p>
                                        </div>
                                        <div style={{ paddingLeft: '130px', fontSize: '20px', marginTop: '5px' }}>
                                            {theater.phone_number}
                                        </div>

                                        <div style={{ display: 'flex', margin: '15px', paddingLeft: '90px' }}>
                                            <img src={placeholder} style={{ height: '25px', width: '25px', marginRight: '5px' }} />
                                            <p style={{ margin: '0px', fontFamily: '微軟正黑體', fontWeight: 'bold' }}>影城地址：</p>
                                        </div>
                                        <div style={{ paddingLeft: '130px', fontSize: '20px', marginTop: '5px', fontWeight: 'bold' }}>
                                            {theater.address}
                                        </div>
                                        <div style={{ display: 'flex', margin: '15px', paddingLeft: '90px' }}>
                                            <img src={car} style={{ height: '25px', width: '25px', marginRight: '5px' }} />
                                            <p style={{ margin: '0px', fontFamily: '微軟正黑體', fontWeight: 'bold' }}>交通資訊：</p>
                                        </div>
                                        <div style={{ marginBottom: '40px' }}>
                                            <div style={{ paddingLeft: '130px', fontSize: '16px', marginTop: '5px', fontWeight: 'bold' }}>
                                                {theater.traffic}
                                            </div>

                                        </div>
                                    </div>
                                    <div style={{  margin: '0px auto', paddingRight: '15px'}} >
                                        <img src={theater.image} style={{ height: '280px', width: '401px' }} />
                                    </div>
                                
                            </div>
                        </div>



                    )}
            </div>
        )
    }
}
export default Theaterinformation
