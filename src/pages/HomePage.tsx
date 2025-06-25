import { useParams } from "react-router-dom";
import { SidebarMenu } from "../cmps/SidebarMenu";
import { SuggestionsSidebar } from "../cmps/SuggestionsSidebar";
import { StoryIndex } from "./StoryIndex";
import React, { useState } from "react";
import { StoryDetailsModal } from "./StoryDetailsModal";
import { userService } from '../services/user'
import { login } from '../store/actions/user.actions'
export function HomePage() {
    const { storyId } = useParams();

    useState(() => {
        _tempLogin()
    })

    async function _tempLogin() {
        const user = userService.getEmptyUser()
        user.username = 'daniel'
        await login(user)
    }
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