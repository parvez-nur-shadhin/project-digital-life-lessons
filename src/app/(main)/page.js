import Banner from "@/Component/Banner";
import Benefits from "@/Component/Benefits";
import FeaturedLessons from "@/Component/FeaturedLessons";
import TopContributors from "@/Component/TopContributors";
import TrendingLessons from "@/Component/TrendingLessons";


export default function Home() {
  return (
    <div className="min-h-screen">
       <Banner />
       <FeaturedLessons />
       <Benefits />
       <TopContributors />
       <TrendingLessons />
    </div>
  );
}
