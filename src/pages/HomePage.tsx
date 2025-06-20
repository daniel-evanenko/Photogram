import { useParams } from "react-router-dom";
import { SidebarMenu } from "../cmps/SidebarMenu";
import { SuggestionsSidebar } from "../cmps/SuggestionsSidebar";
import { StoryIndex } from "./StoryIndex";
import React from "react";
import { StoryDetailsModal } from "./StoryDetailsModal";

export function HomePage() {
    const { storyId } = useParams();

    return (
        <div className="home-page">
            <SidebarMenu />
            <div className="main-content">
                <StoryIndex />
                <SuggestionsSidebar></SuggestionsSidebar>
            </div>
            {storyId && <StoryDetailsModal />}

        </div>
    )


}