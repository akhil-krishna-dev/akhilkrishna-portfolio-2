const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.intersectionRatio >= 0.5) {
				entry.target.classList.add("visible");
			}
		});
	},
	{
		threshold: [0, 0.5, 1.0], // Watch for 50% visibility
	}
);

document.querySelectorAll(".profile-image").forEach((section) => {
	observer.observe(section);
});
document.querySelectorAll(".about-me").forEach((section) => {
	observer.observe(section);
});
document.querySelectorAll(".projects-container").forEach((section) => {
	observer.observe(section);
});
document.querySelectorAll(".contacts-container").forEach((section) => {
	observer.observe(section);
});
document.querySelectorAll(".services-container").forEach((section) => {
	observer.observe(section);
});

//
//
//
let isSubmiting;
const sendEmail = (e) => {
	if (isSubmiting) return;

	isSubmiting = true;
	e.preventDefault();

	const { name, email, subject, message, submit } = e.target;

	const data = {
		name: name.value,
		email: email.value,
		subject: subject.value,
		message: message.value,
	};
	submit.classList.add("is-submitting");

	const controllFormInputs = (keys, inputsTarget, state = false) => {
		for (let key of keys) {
			inputsTarget[key].disabled = state;
		}
	};

	const keys = Object.keys(data);

	controllFormInputs(keys, e.target, true);

	const scriptURL =
		"https://script.google.com/macros/s/AKfycbwumbQa-94EdcDUKN5vXs5-SE4WPP2tiACx-n2ZkhDWoTRb2SMh7mAWnxwCPniHJ3OF/exec";

	fetch(scriptURL, {
		method: "POST",
		body: JSON.stringify(data),
	})
		.then((result) => {
			console.log(result);
			e.target.reset();
		})
		.catch((error) => {
			console.log(error);
		})
		.finally(() => {
			isSubmiting = false;
			controllFormInputs(keys, e.target);
			submit.classList.remove("is-submitting");
		});
};
