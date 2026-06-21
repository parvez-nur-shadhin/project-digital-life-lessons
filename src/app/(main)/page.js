import Banner from "@/Component/Banner";
import Benefits from "@/Component/Benefits";
import TopContributors from "@/Component/TopContributors";
import TrendingLessons from "@/Component/TrendingLessons";


export default function Home() {
  return (
    <div className="min-h-screen">
       <Banner />
       <Benefits />
       <TopContributors />
       <TrendingLessons />
    </div>
  );
}
