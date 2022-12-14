import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UpdateReview = () => {
	const navigate = useNavigate();

	const oldReview = useLoaderData();

	const [review, setReview] = useState(oldReview);

	const handleUpdateComments = (event) => {
		event.preventDefault();
		

		fetch(`https://povi-server.vercel.app/reviews/${oldReview._id}`, {
			method: 'PUT',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(review)
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.modifiedCount > 0) {
					alert('Review Updated Complete');
				}
				navigate('/myreviews');
			})
			.catch((error) => console.error(error));
	};
	const handelUpdateReview = (event) => {
		const field = event.target.name;
		const value = event.target.value;
		const newReview = { ...review };
		newReview[field] = value;
		setReview(newReview);
	};
	return (
		<div className="bg-dark p-4 ">
			<div className="container w-50 text-start my-5">
				<div className=" card  border border-white fw-bold p-5">
					<form onSubmit={handleUpdateComments}>
						<h2 className="text-primary text-center">Update Your Comment</h2>
						<hr />
						<div className="mb-3">
							<label htmlFor="exampleInputName" className="form-label">
								Update Your Name
							</label>
							<input
								onChange={handelUpdateReview}
								name="name"
								type="text"
								className="form-control"
								id="exampleInputName"
								aria-describedby="emailHelp"
								placeholder="Enter Your Name"
								defaultValue={oldReview.name}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="exampleInputEmail1" className="form-label">
								Update Email address
							</label>
							<input
								onChange={handelUpdateReview}
								name="email"
								type="email"
								className="form-control"
								id="exampleInputEmail1"
								aria-describedby="emailHelp"
								placeholder="Enter your Email"
								defaultValue={oldReview.email}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="exampleInputPassword1" className="form-label">
								Update Your Comments
							</label>
							<textarea
								onChange={handelUpdateReview}
								name="comments"
								type="text"
								className="form-control"
								id="exampleInputPassword1"
								placeholder="Write your comment here"
								style={{ height: '100px' }}
								defaultValue={oldReview.comments}
							/>
						</div>

						<button type="submit" className="btn btn-success btn-lg">
							Update Review
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default UpdateReview;
