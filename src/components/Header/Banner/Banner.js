import React from 'react';
import './Banner.css';

const Banner = () => {
	const backImage = {
		backgroundImage:
			"url('https://templates.hibootstrap.com/povi/default/assets/img/hero/hero-bg-2.jpg')",
		height: '90vh',
		width: '100%',
		fontSize: '50px',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat'
	};
	return (
		<div>
			<div style={backImage} className="bannerImage">
				<div className="text-start container">
					<div className="bannerTitle">
						<h3 className="fs-5 fw-bold">Professional Videographer Service</h3>
						<h1 className="fw-bolder" style={{ fontSize: '60px' }}>
							Capture The Best <br /> Experience
						</h1>
						<p className="fs-5  w-50">
							It is a long established fact that a reader will be distracted by
							the reale he point of using Lorem Ipsum is that it has a
							more-or-less normal valid.
						</p>
						<button className="btn btn-lg btn-danger ">All Services</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Banner;
