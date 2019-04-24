import React from 'react'
import Banner from '../images/banner.jpg'
import Banner2 from '../images/banner2.jpg'
import Api from '../Api'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";
import QuickBooking from './QuickBooking';

class SimpleSlider extends React.Component {
    render() {
        const settings = {
            accessibility: true,
            arrows: true,
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            speed: 500,
            autoplaySpeed: 5000,
            appendDots: dots => (
                <div
                    style={{
                        backgroundColor: "#ddd",
                        paddingTop: "10px"
                    }}
                >
                    <ul style={{ margin: "0px" }}> {dots} </ul>
                </div>
            ),
        };
        return (
            <div>
                <Slider  {...settings}>
                    <div><img src={Banner} style={{ width: '100%' }} /></div>
                    <div><img src={Banner2} style={{ width: '100%' }} /></div>
                </Slider>
            </div>
        );
    }
}
class Home extends React.Component {

    state = {
        onShow: true,
        color: 'blue',
        news: [],
    }

    async componentDidMount() {
        fetch('https://databaseproject-222606.appspot.com/news', { method: 'GET' })
            .then(res => res.json())
            .then(js => this.setState({ news: js }))
    }
    render() {
        return (
            <div style={{
                minHeight: 'calc(100vh - 60px)',
                paddingTop: '80px'
            }}>
                <div><SimpleSlider /></div>

                <div style={{
                    display: 'flex',
                    color: '#2E282A',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '70px 0'
                }}>
                    <div style={{
                        display: 'flex',
                        width: '50vw',
                        justifyContent: 'center',
                        paddingLeft: '200px'
                    }}>
                        <QuickBooking />
                    </div>

                    <div style={{ display: 'block', width: '50vw', paddingLeft: '70px' }}>
                        <div style={{ display: 'flex' }}>
                            <div style={{ fontFamily: 'Microsoft JhengHei', fontSize: '40px' }}>
                                最新消息
                                </div>
                            <div className="newChangeColor" style={{ fontFamily: 'Microsoft JhengHei', fontSize: '15px', margin: '0 10px', marginTop: '25px', fontWeight: '300px' }}>
                                More
                                </div>
                        </div>
                        {this.state.news.map(news => (
                            <div style={{ display: 'flex', margin: '10px' }}>

                                <div>
                                    <div style={{ display: 'flex', marginLeft: '50px', marginTop: '5px' }}>

                                        <div style={{
                                            fontFamily: 'Microsoft JhengHei',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: '#2196F3',
                                            padding: '5px',
                                            color: 'white',
                                            fontWeight: '300px',
                                            height: '31px'
                                        }} >
                                            {news.created_at.substring(0, 10)}
                                        </div>

                                        <div className="newChangeColor" style={{
                                            fontFamily: 'Microsoft JhengHei',
                                            display: 'flex',
                                            width: '30vw',
                                            alignItems: 'center',
                                            marginLeft: '20px',
                                            paddingRight: '150px'
                                        }}>{news.title}
                                        </div>
                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>
                </div>

            </div>
        )
    }
}

export default Home


