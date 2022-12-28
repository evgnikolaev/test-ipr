import sliderCard from './slider-card';
import mainHero from './main-hero';
import sliderNews from './slider-news';
import sliderCourses from './slider-courses';
import sliderPersons from './slider-persons';

export default {
	init() {
		sliderCard.init();
		sliderNews.init();
		mainHero.init();
		sliderCourses.init();
		sliderPersons.init();
	},
};
