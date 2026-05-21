import React from 'react'; 
import { cn } from '@/lib/utils'; 
import { 
	 LucideIcon, 
	 PlusIcon, 
} from 'lucide-react'; 
 
type ContactInfoProps = React.ComponentProps<'div'> & { 
	 icon: LucideIcon; 
	 label: string; 
	 value: string; 
	 href?: string;
}; 
 
type ContactCardProps = React.ComponentProps<'div'> & { 
	 // Content props 
	 title?: string; 
	 description?: string; 
	 contactInfo?: ContactInfoProps[]; 
	 formSectionClassName?: string; 
}; 
 
export function ContactCard({ 
	 title = 'Contact With Us', 
	 description = 'If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day.', 
	 contactInfo, 
	 className, 
	 formSectionClassName, 
	 children, 
	 ...props 
 }: ContactCardProps) { 
	 return ( 
	 	 <div 
	 	 	 className={cn( 
	 	 	 	 'bg-white/5 border border-white/10 backdrop-blur-xl relative grid w-full shadow-[0_0_50px_rgba(0,0,0,0.3)] md:grid-cols-1 lg:grid-cols-5 divide-y md:divide-y-0 lg:divide-x divide-white/5 rounded-3xl overflow-hidden', 
	 	 	 	 className, 
	 	 	 )} 
	 	 	 {...props} 
	 	 > 
	 	 	 <PlusIcon className="absolute -top-3 -left-3 h-6 w-6 text-white opacity-20 z-10" /> 
	 	 	 <PlusIcon className="absolute -top-3 -right-3 h-6 w-6 text-white opacity-20 z-10" /> 
	 	 	 <PlusIcon className="absolute -bottom-3 -left-3 h-6 w-6 text-white opacity-20 z-10" /> 
	 	 	 <PlusIcon className="absolute -right-3 -bottom-3 h-6 w-6 text-white opacity-20 z-10" /> 
	 	 	 <div className="flex flex-col justify-between lg:col-span-2 bg-gradient-to-br from-white/[0.02] to-transparent"> 
	 	 	 	 <div className="relative h-full space-y-6 p-8 md:p-12 lg:p-16"> 
	 	 	 	 	 <div className="space-y-4">
						<h1 className="text-3xl font-light md:text-5xl lg:text-6xl text-white tracking-tight geist-font"> 
							{title} 
						</h1> 
						<p className="text-white/40 max-w-xl text-base md:text-lg inter-font font-light leading-relaxed"> 
							{description} 
						</p> 
					 </div>
	 	 	 	 	 <div className="grid gap-x-12 gap-y-6 grid-cols-1 sm:grid-cols-1 pt-8"> 
	 	 	 	 	 	 {contactInfo?.map((info, index) => ( 
	 	 	 	 	 	 	 <ContactInfo key={index} {...info} /> 
	 	 	 	 	 	 ))} 
	 	 	 	 	 </div> 
	 	 	 	 </div> 
	 	 	 </div> 
	 	 	 <div 
	 	 	 	 className={cn( 
	 	 	 	 	 'bg-white/[0.03] flex h-full w-full items-center p-8 md:p-12 lg:col-span-3', 
	 	 	 	 	 formSectionClassName, 
	 	 	 	 )} 
	 	 	 > 
	 	 	 	 {children} 
	 	 	 </div> 
	 	 </div> 
	 ); 
 } 
 
 function ContactInfo({ 
	 icon: Icon, 
	 label, 
	 value, 
	 href,
	 className, 
	 ...props 
 }: ContactInfoProps) { 
	 const content = (
		<>
			<div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-white group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-sm"> 
				<Icon className="h-6 w-6" /> 
			</div> 
			<div className="space-y-1"> 
				<p className="text-xs font-medium text-white/30 uppercase tracking-widest inter-font">{label}</p> 
				<p className="text-white text-base md:text-lg font-light tracking-tight geist-font">{value}</p> 
			</div> 
		</>
	 );

	 if (href) {
		return (
			<a 
				href={href} 
				target="_blank" 
				rel="noopener noreferrer" 
				className={cn('flex items-center gap-3 py-3 group hover:opacity-80 transition-opacity', className)}
			>
				{content}
			</a>
		);
	 }

	 return ( 
	 	 <div className={cn('flex items-center gap-3 py-3', className)} {...props}> 
	 	 	 {content}
	 	 </div> 
	 ); 
 } 
