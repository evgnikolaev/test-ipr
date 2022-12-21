import sliderCard from './slider-card';
import mainHero from './main-hero';
import sliderNews from './slider-news';
import sliderCourses from './slider-courses';

export default {
	init() {
		sliderCard.init();
		sliderNews.init();
		mainHero.init();
		sliderCourses.init();
	},
};
