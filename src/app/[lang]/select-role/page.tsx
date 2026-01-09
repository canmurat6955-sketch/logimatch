import RoleSelection from "@/components/auth/RoleSelection";

export default function Page({ params: { lang } }: { params: { lang: string } }) {
    return <RoleSelection lang={lang} />;
}
