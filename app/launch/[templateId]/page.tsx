import { auth } from "@clerk/nextjs/server";
import { getGuestCompanionTemplate } from "@/constants";
import { getOrCreateCompanionFromTemplate } from "@/lib/actions/companion.actions";
import { redirect } from "next/navigation";

interface LaunchTemplatePageProps {
  params: Promise<{ templateId: string }>;
}

const LaunchTemplatePage = async ({ params }: LaunchTemplatePageProps) => {
  const { templateId } = await params;
  const template = getGuestCompanionTemplate(templateId);

  if (!template) redirect("/companions");

  const { userId } = await auth();
  if (!userId) {
    redirect(
      `/sign-in?redirect_url=${encodeURIComponent(`/launch/${templateId}`)}`
    );
  }

  try {
    const companion = await getOrCreateCompanionFromTemplate(templateId);
    redirect(`/companions/${companion.id}`);
  } catch (error) {
    console.error("Template launch failed", { templateId, error });
    redirect("/companions");
  }
};

export default LaunchTemplatePage;
