import React from "react";
import { UserSuggestion } from "./UserSuggestion";

export function SuggestionsSidebar() {
    const suggestions = [
        {
            username: "pop_juice_haifa",
            subtext: "Followed by eldar_faragi + 1 more",
            imgUrl: "/avatars/popjuice.jpg",
            actionText: "Follow"
        },
        {
            username: "almogpuka",
            subtext: "Followed by ehabalem1108 + 2 more",
            imgUrl: "/avatars/almogpuka.jpg",
            actionText: "Follow"
        },
        {
            username: "hapshutaofficial",
            subtext: "Followed by feelbetterinmysweat",
            imgUrl: "/avatars/hapshuta.jpg",
            actionText: "Follow"
        },
        {
            username: "n.atela",
            subtext: "Followed by tay_rozen + 7 more",
            imgUrl: "/avatars/natela.jpg",
            actionText: "Follow"
        },
        {
            username: "mati.bike.life",
            subtext: "Followed by ehabalem1108 + 3 more",
            imgUrl: "/avatars/matibike.jpg",
            actionText: "Follow"
        }
    ];

    return (
        <div className="suggestions-sidebar">
            <UserSuggestion
                username="daniel__evanenko"
                subtext="Daniel Evanenko"
                imgUrl="/avatars/daniel.jpg"
                actionText="Switch"
            />

            <div className="suggested-header">
                <span>Suggested for you</span>
                <a>See All</a>
            </div>

            <div className="suggestion-list">
                {suggestions.map((user, idx) => (
                    <UserSuggestion key={idx} {...user} />
                ))}
            </div>
        </div>
    );
}
