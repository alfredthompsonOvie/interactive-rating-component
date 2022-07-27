const ratings = document.querySelector(".ratings");
const submitBtn = document.querySelector(".btn__submit");
const card__feedback = document.querySelector(".card__feedback");
const selected__rating = document.querySelector(".selected__rating");
const btn__rating = document.querySelectorAll(".btn__rating");

gsap.set(".card__feedback", {
	autoAlpha: 0,
});

ratings.addEventListener("click", (e) => {
	let clicked = e.target.closest(".btn__rating");
	if (!clicked) return;
	btn__rating.forEach((b) => b.classList.remove("isSelected"));
	clicked.classList.add("isSelected");
	let rating = clicked.dataset.rating;
	selected__rating.textContent = rating;
});
submitBtn.addEventListener("click", () => {
	let state = selected__rating.textContent;
	if (state === "" || state === null) {
		card__feedback.classList.add("isHidden");
	} else {
		card__feedback.classList.remove("isHidden");

		const tl = gsap.timeline({
			paused: true,
			defaults: {
				ease: "none",
				duration: 0.4,
			},
		});
		tl.to(".ratingCard", {
			autoAlpha: 0,
			y: 30,
		}).fromTo(
			".card__feedback",
			{
				autoAlpha: 0,
				y: 30,
			},
			{
				autoAlpha: 1,
				y: 0,
			}
		);
		tl.play();
		setTimeout(() => {
			tl.reverse();
			btn__rating.forEach((b) => b.classList.remove("isSelected"));
			selected__rating.textContent = "";
		}, 4000);
	}
});

const tl = gsap.timeline();
tl.from(".ratingCard", {
	autoAlpha: 0,
	y: 100,
	ease: "back.out",
	duration: 1.2,
})
	.from(".star", {
		autoAlpha: 0,
	})
	.from([".title", ".text"], {
		autoAlpha: 0,
		stagger: 0.2,
		y: 20,
	})
	.from([".btn__rating", ".btn__submit"], {
		autoAlpha: 0,
		stagger: 0.2,
		y: 30,
		ease: "back.out",
  })
  .from(".attribution", {
    autoAlpha: 0,
  });
