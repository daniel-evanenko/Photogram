import { SidebarMenu } from "../cmps/SidebarMenu";
import { SuggestionsSidebar } from "../cmps/SuggestionsSidebar";
import { StoryIndex } from "./StoryIndex";

export function HomePage() {

    return (
        <div className="home-page">
            <SidebarMenu />
            <div className="main-content">
                <StoryIndex />
                <SuggestionsSidebar></SuggestionsSidebar>
            </div>
        </div>
    )


}