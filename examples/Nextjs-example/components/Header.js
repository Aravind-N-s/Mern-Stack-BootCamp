import Link from 'next/link'

const linkStyle = {
	marginRight: 15
}

const Header = () => (
	<div>
	<ul>
	<li>
		<Link href="/">
			<a style={linkStyle}>Home</a>
		</Link>
		</li>
		<li>
		<Link href="/about"  prefetch={true}>
			<a style={linkStyle}>About</a>
		</Link>
		</li>
		<li>
		<Link href="/images"  prefetch={true}>
			<a style={linkStyle}>Images</a>
		</Link>
		</li>
		</ul>

		<style jsx>{`
		ul {
		  background: #333;
		  color: #fff;
		  list-style: none;
		  display: flex;
		}
		ul li {
		  font-size: 18px;
		  margin-right: 20px;
		}
		ul li a {
		  color: #fff;
		  text-decoration: none;
		}
	   `}</style>
	</div>
)

export default Header
