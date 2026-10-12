import { redirect } from 'next/navigation'

export default function CampaignDetailRedirectPage() {
    redirect('/admin/catalog/campaigns/1')
}
