import { redirect } from 'next/navigation'

export default function CampaignDetailRedirectPage() {
    redirect('/admin/categories/campaigns/1')
}
