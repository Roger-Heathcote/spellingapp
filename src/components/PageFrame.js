import React, {useState} from 'react';
import styles from './PageFrame.module.css';

function PageFrame({header, body, footer}) {
	if (body || header || footer) {
		return (
			<div className={styles.pageFrame}>
				{header !== undefined && <header>{header}</header>}
				{body !== undefined && <div className={styles.content}>{body}</div>}
				{footer !== undefined && <footer>{footer}</footer>}
			</div>
		);
	} else {
		return <div className={styles.pageFrame}>{props.children}</div>;
	}
}

export default PageFrame;
