/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: {
        decade: string;
        imageUrl: string;
        shareUrl: string;
    } | null;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, data }) => {
    const [copyButtonText, setCopyButtonText] = useState('Copy Link');

    useEffect(() => {
        // Reset button text when modal is reopened with new data
        if (isOpen) {
            setCopyButtonText('Copy Link');
        }
    }, [isOpen]);

    if (!data) return null;

    const { decade, imageUrl, shareUrl } = data;

    const shareText = `Check out my photo from the ${decade}, created with the Past Forward app!`;
    const encodedShareUrl = encodeURIComponent(shareUrl);
    const encodedShareText = encodeURIComponent(shareText);

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?url=${encodedShareUrl}&text=${encodedShareText}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`,
        reddit: `https://www.reddit.com/submit?url=${encodedShareUrl}&title=${encodedShareText}`,
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareUrl).then(() => {
            setCopyButtonText('Copied!');
            setTimeout(() => setCopyButtonText('Copy Link'), 2000);
        }).catch(err => {
            console.error('Failed to copy link: ', err);
            alert('Failed to copy link.');
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-neutral-800 border border-neutral-700 rounded-lg shadow-2xl w-full max-w-md p-6 text-white relative"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 text-neutral-500 hover:text-white transition-colors"
                            aria-label="Close share dialog"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h2 className="font-permanent-marker text-2xl text-center mb-4 text-yellow-400">Share Your {decade} Look!</h2>
                        
                        <div className="bg-neutral-100 p-2 pb-10 flex flex-col items-center justify-start aspect-[3/4] w-64 mx-auto rounded-sm shadow-lg relative">
                            <div className="w-full bg-neutral-900 shadow-inner flex-grow relative overflow-hidden">
                                <img src={imageUrl} alt={decade} className="w-full h-full object-cover" />
                            </div>
                            <p className="font-permanent-marker text-base text-black absolute bottom-2 text-center truncate px-2">{decade}</p>
                        </div>
                        
                        <div className="mt-6 space-y-4">
                            <div className="flex justify-center gap-4">
                                <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-3 bg-neutral-700 rounded-full hover:bg-neutral-600 transition-colors" aria-label="Share on X">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                </a>
                                <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="p-3 bg-neutral-700 rounded-full hover:bg-neutral-600 transition-colors" aria-label="Share on Facebook">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z" /></svg>
                                </a>
                                <a href={shareLinks.reddit} target="_blank" rel="noopener noreferrer" className="p-3 bg-neutral-700 rounded-full hover:bg-neutral-600 transition-colors" aria-label="Share on Reddit">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12.469c-1.664 0-3.014 1.35-3.014 3.014s1.35 3.014 3.014 3.014 3.014-1.35 3.014-3.014-1.35-3.014-3.014-3.014zm5.5 0c-1.664 0-3.014 1.35-3.014 3.014s1.35 3.014 3.014 3.014 3.014-1.35 3.014-3.014-1.35-3.014-3.014-3.014z" /></svg>
                                </a>
                            </div>
                            <div className="flex">
                                <button
                                    onClick={handleCopyLink}
                                    className="w-full bg-yellow-400 text-black font-permanent-marker text-lg py-2 px-4 rounded-sm hover:bg-yellow-300 transition-colors transform hover:scale-105"
                                >
                                    {copyButtonText}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ShareModal;
