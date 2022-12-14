import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import SingleServiceReview from './SingleServiceReview';
import { Link } from 'react-router-dom';

const ServiceReview = () => {
	const { user } = useContext(AuthContext);
	const [reviews, setReviews] = useState([]);

	const handleComments = (event) => {
		event.preventDefault();
		const form = event.target;
		const name = form.name.value;
		const email = form.email.value;
		const photoURL = user?.photoURL || 'Unregister';
		const comments = form.comments.value;

		const AddReviews = {
			name,
			email,
			photoURL,
			comments
		};

		fetch('https://povi-server.vercel.app/addreviews', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(AddReviews)
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.acknowledged) {
					alert('New Review Added');
					form.reset();
				}
			})
			.catch((error) => console.error(error));
	};

	useEffect(() => {
		fetch('https://povi-server.vercel.app/reviews')
			.then((res) => res.json())
			.then((data) => setReviews(data));
	}, []);

	return (
		<div>
			{user ? (
				<div className="row">
					<div className="col-md-6 border rounded p-4">
						<h2 className="text-primary">Service Review</h2>
						{reviews.map((review) => (
							<SingleServiceReview
								key={review._id}
								review={review}
							></SingleServiceReview>
						))}
					</div>
					<div className="col-md-6 card bg-dark p-4 border border-white">
						<form onSubmit={handleComments}>
							<h2 className="text-primary">Write Your Comment</h2>
							<hr />
							<div className="mb-3">
								<label htmlFor="exampleInputName" className="form-label">
									Your Name
								</label>
								<input
									name="name"
									type="text"
									className="form-control"
									id="exampleInputName"
									aria-describedby="emailHelp"
									placeholder="Enter Your Name"
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="exampleInputEmail1" className="form-label">
									Email address
								</label>
								<input
									name="email"
									type="email"
									className="form-control"
									id="exampleInputEmail1"
									aria-describedby="emailHelp"
									placeholder="Enter your Email"
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="exampleInputPassword1" className="form-label">
									Your Comments
								</label>
								<textarea
									name="comments"
									type="text"
									className="form-control"
									id="exampleInputPassword1"
									placeholder="Write your comment here"
									style={{ height: '100px' }}
								/>
							</div>

							<button type="submit" className="btn btn-danger w-100 btn-lg">
								Submit Review
							</button>
						</form>
					</div>
				</div>
			) : (
				<>
					<h2 className="text-center">
						Please login to add a review <Link to="/login">Click Here</Link>
					</h2>
				</>
			)}
		</div>
	);
};

export default ServiceReview;
