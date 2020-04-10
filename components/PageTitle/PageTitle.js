import Link from 'next/link'

const PageTitle = ({ heading, subHeading, bcLinks }) => {
	const renderBreadCrumbLinks = () => {
		if (bcLinks) {
			let len = bcLinks.length
			return bcLinks.map((b, i) => {
				if (i + 1 === len) {
					return (
						<li key={i} className="breadcrumb-item active" aria-current="page">
							{b.name}
						</li>
					)
				} else {
					return (
						<li key={i} className="breadcrumb-item" aria-current="page">
							<Link href={b.href}>
								<a>{b.name}</a>
							</Link>
						</li>
					)
				}
			})
		}
	}
	return (
		<section id="page-title">

			<div className="container clearfix">
				<h1>{heading}</h1>
				<span>{subHeading}</span>
				<ol className="breadcrumb">
					<li className="breadcrumb-item"><Link href="/"><a>Home</a></Link></li>
					{renderBreadCrumbLinks()}
				</ol>
			</div>

		</section>
	)
}

export default PageTitle