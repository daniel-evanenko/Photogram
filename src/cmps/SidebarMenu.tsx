import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { ReactSVG } from "react-svg";

type SidebarItem = {
    label: string;
    icon?: string;
    avatar?: boolean;
    isLast?: boolean;
};

export function SidebarMenu() {
    const [active, setActive] = useState<string>("Home");

    const sidebarItems: SidebarItem[] = [
        { label: "Home", icon: "/public/icons/home.svg" },
        { label: "Search", icon: "/public/icons/search.svg" },
        { label: "Messages", icon: "/public/icons/msg.svg" },
        { label: "Notifications", icon: "/public/icons/heart.svg" },
        { label: "Create", icon: "/public/icons/add.svg" },
        { label: "Profile", avatar: true },
        { label: "More", icon: "/public/icons/more-bars.svg" },
    ];


    return (
        <section className="sidebar-menu">
            <a className="logo">
                <ReactSVG src="/public/icons/instagram-logo.svg" />
            </a>

            <nav className="nav">
                {sidebarItems.map((item) => (

                    <a
                        key={item.label}
                        className={active === item.label ? "active" : ""}
                        onClick={() => setActive(item.label)}
                    >
                        <span className="content">
                            {item.avatar ? (
                                <Avatar sx={{ width: 22, height: 22 }} />
                            ) : (
                                item.icon && <ReactSVG src={item.icon} />
                            )}
                            {item.label}
                        </span>
                    </a>


                ))}
            </nav>
        </section>
    );

}

