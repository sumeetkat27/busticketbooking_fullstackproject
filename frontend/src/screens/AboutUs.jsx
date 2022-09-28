import Prasad from '../assets/Prasad Gawade.jpg'
import Sumeet from '../assets/Sumeet.jpeg'
import HomeNavigation from '../components/HomeNavigation';

const AboutUs = () => {


    return (<>
        <HomeNavigation />
        <section className="about-page" >
            <div className="container">
                <div className="aboutrow12">

                    <div className="row row2">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="heading abt-head wow fadeInDown">
                                <h3 style={{ color: '#140E54' }}>Welcome to Royal Travels Booking System</h3>
                                <strong>Why Royal Travels</strong> </div>
                            <article className="wow fadeInDown" >
                                <p>Serving customer better and best in all possibilities is our mission</p>
                                <p>We are a perfect blend of technological excellence, complete infrastructure,
                                    competent care and heartfelt hospitality - this is how the people, whom we have been fortunate to serve people.</p>
                                <strong>Mission</strong>
                                <p>For the betterment in travels bookings system and make seat booking experience smooth for customer
                                </p>

                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="director_sec">
            <div className="container">
                <div className="row dir_inner">
                    <h3 className="h3">Director’s Message</h3>

                    <div className="row">
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <article>
                                <img className="img-responsive" src={Prasad} alt="Prasad Gawade" />
                                <div className="dir_txt">
                                    <h4>Mr.Prasad Gawade</h4>
                                    <p>Pursuing CDAC from IACSD</p>
                                    <p>As a Leader of this project in development I have handled all the responsibilities in leading the project and delivering on time with quality</p>

                                    <div className="md-overlay"></div>
                                </div>
                            </article>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <article>
                                <img className="img-responsive" src={Sumeet} alt="#" />
                                <div className="dir_txt">
                                    <h4>Mr. Sumeet</h4>
                                    <p>Pursuing CDAC from IACSD</p>
                                    <p>I have taken care of backend development of this project and maintainnign flow of the project.</p>


                                    <div className="md-overlay"></div>
                                </div>
                            </article>
                        </div>

                    </div>


                </div>
            </div>
        </section>

    </>)
}

export default AboutUs;